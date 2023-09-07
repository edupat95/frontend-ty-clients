import { Alert, AlertTitle, AlertProps } from '@mui/material';
import { useEffect, useState } from 'react';

interface ErrorMessageComponentProps {
  message: { visible: boolean; type: string; message: string };
  setMessage: (error: { visible: boolean; type: string; message: string }) => void;
}

const ErrorMessageComponent = (props: ErrorMessageComponentProps) => {
  const { message, setMessage } = props;
  const [severity, setSeverity] = useState<AlertProps['severity']>('info');
  const [title, setTitle] = useState<string>('Info');
  
  useEffect(() => {
    if (message.visible) {
      setTimeout(() => {
        setMessage({ type:'',visible: false, message: '' });
      }, 3500);
    }
  }, []);
  
  useEffect(() => {
    let newSeverity: AlertProps['severity'] = 'info';
    if(message.type==='error'){
      newSeverity = 'error';
      setTitle('Error');
    }else if (message.type==='success'){
      newSeverity = 'success';
      setTitle('Success');
    }else if (message.type==='info'){
      newSeverity = 'info';
      setTitle('Info');
    }else if (message.type==='warning'){
      newSeverity = 'warning';
      setTitle('Warning');
    }
    setSeverity(newSeverity);
  }, [message.type]);


  return (
    <div>
      <Alert 
        severity={severity}
        onClose={() => setMessage({ visible: false, type: "error", message: "" }) //alert("Seleccione una caja antes de asignar un cajero.")
   }>
        <AlertTitle>{title}</AlertTitle>
        {message.message}
      </Alert>
    </div>
  );
};

export default ErrorMessageComponent;
