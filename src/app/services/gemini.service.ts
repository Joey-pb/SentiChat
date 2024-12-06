import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private genAi: GoogleGenerativeAI;
  private schema = {
    description: 'Sentiment Analysis',
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        rating: {
          type: SchemaType.NUMBER,
          nullable: false,
          description: 'The rating of the sentiment analysis',
        },
        abusive: {
          type: SchemaType.BOOLEAN,
          nullable: false,
          description: 'Whether the text is abusive',
        },
        classification: {
          type: SchemaType.STRING,
          nullable: false,
          description: 'The classification of the sentiment analysis',
        },
        description: {
          type: SchemaType.STRING,
          nullable: false,
          description: 'The description of the sentiment analysis',
        },
      },
      required: ['rating', 'abusive', 'classification', 'description'],
    },
  };

  constructor() {
    this.genAi = new GoogleGenerativeAI(environment.geminiApiKey);
  }

  async analyzeSentiment(text: string) {
    const model = this.genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: this.schema,
      },
    });

    const prompt = `
    Analyze the sentiment of the text. 

    Classify the text with a classification of [VERY NEGATIVE, NEGATIVE, SLIGHTLY NEGATIVE, NEUTRAL, SLIGHTLY POSITIVE, POSITIVE, VERY POSITIVE]. 

    If the text is abusive or dangerous flag it as abusive.
    
    Give a short, descriptive point about the sentiment that begins with "Expresses". 
    
    Provide a rating from -10 to 10.
    
    The text is ${text}`;
    const result = await model.generateContent([prompt]);
    return result.response.text();
  }
}
