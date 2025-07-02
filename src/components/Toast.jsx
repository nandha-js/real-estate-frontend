import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ type = 'success', message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500" />;
      case 'info':
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const bgClass = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
  }[type];

  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded shadow-md border ${bgClass} w-full max-w-sm mx-auto`}>
      <div className="flex items-center space-x-2">
        {getIcon()}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button onClick={onClose} className="text-xl text-gray-500 hover:text-black">
        <FaTimes />
      </button>
    </div>
  );
};

export default Toast;
