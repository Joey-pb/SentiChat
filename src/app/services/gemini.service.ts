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

  async analyzeSentiment(query: string | null) {
    const model = this.genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: this.schema,
      },
    });

    const prompt = `
    Analyze the sentiment of the text. Analyze the sentiment in the context of discourse. 

    Classify the text with a classification of [NEGATIVE, NEUTRAL, POSITIVE]. 

    Only classify the text as NEGATIVE if it expresses hostility, agression, anger, or insults. Do not classify the text as NEGATIVE if it is just criticism or expresses disagreement, disapproval, dissatisfaction, or sadness. Feeling bad, sad, or physical pain is not the same as being negative.

    If the text is abusive or dangerous flag it as abusive. Only flag the text if it could cause harm or threatens to cause harm to someone.
    
    Give a short, descriptive point about the sentiment that begins with "Expresses" and is 7 words or less. 
    
    Provide a rating from -10 to 10.
    
    The text is ${query}`;
    const result = await model.generateContent([prompt]);
    return JSON.parse(result.response.text());
  }
}
