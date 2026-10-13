import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '15mb' }));

// Shared Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 1. Generate Voiceover via Gemini 3.8 Flash Lite TTS
app.post('/api/generate-voiceover', async (req, res) => {
  try {
    const { text, voice = 'Kore', dialect = 'egyptian', style = 'energetic_commercial', dialectName = '' } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'النص المطلوب تحويله إلى صوت غير موجود' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'مفتاح GEMINI_API_KEY غير مهيأ في الخادم' });
    }

    // Build dialect & style description for speech synthesis
    const dialectStyleMap: Record<string, string> = {
      egyptian: 'Authentic Egyptian colloquial Arabic dialect (لهجة مصرية عامية عفوية وطبيعية)',
      saudi_najdi: 'Authentic Saudi Najdi Arabic dialect (لهجة سعودية نجدية واثقة وفخمة)',
      saudi_hijazi: 'Warm Saudi Hijazi Arabic dialect (لهجة حجازية سعودية ناعمة وودودة)',
      emirati: 'Authentic Emirati Gulf Arabic dialect (لهجة إماراتية خليجية أصيلة)',
      kuwaiti: 'Authentic Kuwaiti Gulf Arabic dialect (لهجة كويتية راقية)',
      levantine_syrian: 'Natural Syrian Damascene Levantine Arabic (لهجة سورية شامية دمشقية عذبة)',
      levantine_lebanese: 'Lively Lebanese Levantine Arabic (لهجة لبنانية عصرية وجذابة)',
      levantine_jordanian: 'Jordanian and Palestinian Levantine Arabic (لهجة أردنية وفلسطينية متقنة)',
      moroccan: 'Authentic Moroccan Arabic Darija (الدارجة المغربية الأصلية بطلاقة)',
      algerian: 'Authentic Algerian Arabic Darija (الدارجة الجزائرية المعبرة)',
      tunisian: 'Authentic Tunisian Arabic dialect (الدارجة التونسية الجميلة)',
      iraqi: 'Authentic Iraqi Arabic dialect (لهجة عراقية بغدادية مميزة ودافئة)',
      sudanese: 'Warm Sudanese Arabic dialect (لهجة سودانية واضحة ومحبوبة)',
      yemeni: 'Authentic Yemeni Arabic dialect (لهجة يمنية أصيلة)',
      msa_standard: 'Prestigious Modern Standard Arabic with full classical eloquence (لغة عربية فصحى متقنة وواضحة مخارج الحروف)',
      english_us: 'Natural American English accent, clear broadcast articulation',
      english_uk: 'Sophisticated British English accent, refined tone',
    };

    const styleToneMap: Record<string, string> = {
      energetic_commercial: 'High-energy, persuasive commercial advertising voiceover, punchy delivery',
      documentary_deep: 'Deep, calm, narrative, cinematic documentary narrator with reflective pauses',
      conversational_podcast: 'Warm, friendly, casual conversational podcast speaker, intimate and authentic',
      dramatic_cinematic: 'Dramatic, intense, emotional cinematic trailer narration',
      tiktok_fast: 'Fast-paced, hook-driven, engaging youth social media reel delivery',
      news_anchor: 'Formal, authoritative, crystal-clear news broadcast presentation',
      storyteller_warm: 'Enchanting, gentle, expressive storytelling for audiobooks and narratives',
    };

    const dialectDesc = dialectStyleMap[dialect] || (dialectName ? `Dialect: ${dialectName}` : 'Natural Arabic speech');
    const styleDesc = styleToneMap[style] || 'Professional and engaging audio delivery';

    const fullStylePrompt = `${dialectDesc}. Delivery style: ${styleDesc}. Ensure natural speech rhythm, authentic pronunciation of dialect idioms, and correct syllable stress.`;

    // Available prebuilt voices: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
    const validVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'];
    const chosenVoice = validVoices.includes(voice) ? voice : 'Kore';

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: text.trim(),
              speechMetadata: {
                style: fullStylePrompt,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: chosenVoice },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error('لم يتم استلام بيانات الصوت من نموذج تحويل النص إلى كلام');
    }

    res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
      voice: chosenVoice,
      dialect,
      style,
    });
  } catch (error: any) {
    console.error('TTS Generation Error:', error);
    res.status(500).json({
      error: error?.message || 'حدث خطأ أثناء توليد الصوت. يرجى المحاولة مرة أخرى.',
    });
  }
});

// 2. Convert / Adapt Script to Target Dialect via Gemini 3.8 Flash
app.post('/api/convert-dialect', async (req, res) => {
  try {
    const { text, targetDialect, targetDialectName, tone, addTashkeel = true } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'يرجى تقديم النص المراد تحويله' });
    }

    const systemInstruction = `أنت خبير لغوي وصانع محتوى وفويس أوفر محترف متخصص في جميع اللهجات العربية والعالمية.
مهمتك هي تحويل وتكييف النص المعطى إلى اللهجة المطلوبة بدقة شديدة مع استخدام المفردات والتراكيب والتعابير العامية الأصيلة الخاصة بأهل البلد (Colloquial Idioms & Phrasing) بحيث يبدو طبيعياً وعفوياً 100% عند قراءته كفويس أوفر.
${addTashkeel ? 'قم بضبط الكلمات التي قد يلتبس نطقها بالتشكيل (الحركات) لضمان خروج مخارج الحروف بأعلى دقة في التسجيل الصوتي.' : ''}
حافظ على جوهر الرسالة، وركز على سلاسة الإلقاء الصوتي.`;

    const prompt = `حول النص التالي إلى: "${targetDialectName || targetDialect}".
الأسلوب والنبرة المرغوبة: "${tone || 'إعلاني جذاب وطبيعي'}".
النص الأصلي:
"""
${text.trim()}
"""

أرجع النتيجة بصيغة JSON حصراً بالشكل التالي:
{
  "convertedText": "النص المحوّل بالكامل إلى اللهجة المستهدفة مع التشكيل المناسب للنطق الصوتي",
  "dialectTitle": "اسم اللهجة بالعربية",
  "vocabularyNotes": ["ملاحظة 1 حول المفردات المستخدمة", "ملاحظة 2 حول طريقة نطق حرف معين مثل القاف أو الجيم في هذه اللهجة"],
  "catchyHookAlternative": "خيار بديل لجملة الافتتاحية أكثر جذباً للجمهور المحلي",
  "phoneticGuide": "نصيحة موجزة لمؤدي الصوت حول النبرة وسرعة الإلقاء"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const jsonStr = response.text?.trim() || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(jsonStr);
    } catch {
      parsedData = { convertedText: response.text || text };
    }

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Dialect conversion error:', error);
    res.status(500).json({
      error: error?.message || 'حدث خطأ أثناء تحويل اللهجة',
    });
  }
});

// 3. AI Script Generator for Voiceovers
app.post('/api/generate-script', async (req, res) => {
  try {
    const { topic, dialectName, styleName, duration = '30s', targetAudience } = req.body;

    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return res.status(400).json({ error: 'يرجى تقديم فكرة أو موضوع الاسكريبت' });
    }

    const systemInstruction = `أنت كاتب سيناريو وإعلانات وفويس أوفر عالمي متميز.
تكتب سكريبتات تعليق صوتي مؤثرة، ذات خطاف قوي (Hook)، جسم محتوى مقنع، ودعوة لاتخاذ إجراء واضحة (Call To Action).
تلتزم بدقة متناهية باللهجة المطلوبة والأسلوب المحدد.`;

    const prompt = `اكتب سكريبت فويس أوفر احترافي بالمواصفات التالية:
الموضوع: "${topic}"
اللهجة المستهدفة: "${dialectName || 'اللهجة المصرية'}"
الأسلوب: "${styleName || 'إعلاني حماسي'}"
المدة التقريبية: "${duration}"
الجمهور المستهدف: "${targetAudience || 'عام'}"

أرجع الرد بصيغة JSON بالشكل:
{
  "title": "عنوان جذاب للسكريبت",
  "script": "نص السكريبت الكامل المكتوب باللهجة المطلوبة ومشكول بما يضمن سلامة الإلقاء الصوتي",
  "hook": "الخطاف الافتتاحي في أول 3 ثواني",
  "callToAction": "الدعوة لاتخاذ إجراء الختامية",
  "pacingTip": "نصيحة حول توقيت التنفس والوقفات الدرامية"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const jsonStr = response.text?.trim() || '{}';
    let scriptData = {};
    try {
      scriptData = JSON.parse(jsonStr);
    } catch {
      scriptData = { script: response.text || topic };
    }

    res.json({
      success: true,
      data: scriptData,
    });
  } catch (error: any) {
    console.error('Script generation error:', error);
    res.status(500).json({
      error: error?.message || 'حدث خطأ أثناء كتابة السكريبت',
    });
  }
});

// Serve frontend in production or development
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
