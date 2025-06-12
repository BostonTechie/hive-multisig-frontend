import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

export const Toastify = (type: string, data: string) => {
  const cleanData = DOMPurify.sanitize(data);

  if (type === 'info') toast.info(cleanData);
  if (type === 'error') toast.error(cleanData);
  if (type === 'success') toast.success(cleanData);
  if (type === 'warning') toast.warning(cleanData);
};
