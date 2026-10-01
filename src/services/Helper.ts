import { Failed } from '@/lib/interfaces/State';

export function getFailed(is: false, path: string='', message: string='An error occurred') {
    return { is: is, path, message: message } as Failed;
}