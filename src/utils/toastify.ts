import { toast } from 'react-toastify';

export const Toastify = (type: string, data: string) => {
  if (type === 'info') toast.info(data);
  if (type === 'error') toast.error(data);
  if (type === 'success') toast.success(data);
  if (type === 'warning') toast.warning('Wow so easy !');
};
