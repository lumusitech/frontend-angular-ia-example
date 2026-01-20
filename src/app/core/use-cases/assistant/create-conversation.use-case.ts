import { environment } from 'environments/environment.development';

interface Options {
  prompt: string;
  conversationId?: string;
}

interface QuestionResponse {
  conversationId: string;
  content: string;
}

export const createConversationUseCase = async (options: Options) => {
  const { prompt, conversationId } = options;

  try {
    const resp = await fetch(`${environment.backendApi}/sam-assistant/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, conversationId }),
    });

    if (!resp.ok) throw new Error('Cannot create conversation');

    const questionResponse: QuestionResponse = await resp.json();

    return questionResponse;
  } catch (error) {
    console.log(error);
    return null;
  }
};
