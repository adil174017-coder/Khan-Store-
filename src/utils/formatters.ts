export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const generateOrderId = (): string => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `KHAN-${randomNum}`;
};

export const generateTrackingNumber = (): string => {
  const randomNum = Math.floor(100000000 + Math.random() * 900000000);
  return `BLUEDART-${randomNum}IN`;
};
