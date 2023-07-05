import DOMPurify from 'dompurify';

export const sanitize = (str: string) => DOMPurify.sanitize(str);
