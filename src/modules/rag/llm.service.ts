export class LLMService {
  private apiKey: string;
  private apiUrl: string = "https://openrouter.ai/api/v1";
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    this.model =
      process.env.OPENROUTER_LLM_MODEL ||
      "nvidia/nemotron-3-super-120b-a12b:free";

    if (!this.apiKey) {
      throw new Error("OpenRouter api key is missing...");
    }
  }

  async generateResponse(
    prompt: string,
    context: string[] = [],
    asJson: boolean = false,
  ) {
    try {
      const MAX_CONTEXT_CHARS = 12000;

      const trimmedContext = context.join("\n\n").slice(0, MAX_CONTEXT_CHARS);

      let fullPrompt = `
        You are an AI assistant for a tutoring platform.

        Use ONLY the provided context to answer the question.
        If the answer is not in the context, say: "I don't have enough information."

        Context:
        ${trimmedContext}

        Question:
        ${prompt}

        Answer:
        `;

              if (asJson) {
                fullPrompt += `
        Return ONLY valid JSON:
        {
          "tutors": [
            {
              "name": "Tutor Name",
              "reason": "Why suitable",
              "subject": "Subject"
            }
          ]
        }
        `;
      }

      const bodyPayload: any = {
        model: this.model,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: fullPrompt },
        ],
        temperature: asJson ? 0 : 0.3,
        max_tokens: 1500,
      };

      const isOpenAIModel = this.model.startsWith("openai/");

      if (asJson && isOpenAIModel) {
        bodyPayload.response_format = { type: "json_object" };
      }

      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL || "",
          "X-Title": process.env.APP_NAME || "Mentora",
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "LLM error");
      }

      const data = await response.json();
      const raw = data.choices[0].message.content;

      if (asJson) {
        try {
          return JSON.parse(raw);
        } catch {
          throw new Error("Invalid JSON returned from model");
        }
      }

      return raw;
    } catch (error) {
      console.error("LLM error:", error);
      throw error;
    }
  }
}
