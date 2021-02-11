import {getApiUrl} from '@/util/getApiUrl';
import {request, ResponseType} from '@/util/request';

export const subscribeToNewsletter = (email: string): Promise<ResponseType<Record<string, unknown>>> =>
    request(
        getApiUrl('/forms/newsletter'),
        {method: 'POST', body: JSON.stringify({email})},
    );
