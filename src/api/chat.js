import client from './client';

export const initChat = async (threadId) => {
    const response = await client.post('/chat/init', { thread_id: threadId });
    return response.data;
};

export const registerLead = async (data) => {
    const response = await client.post('/chat/register', data);
    return response.data;
};

export const sendMessage = async (message, threadId) => {
    const response = await client.post('/chat', { message, thread_id: threadId });
    return response.data;
};
