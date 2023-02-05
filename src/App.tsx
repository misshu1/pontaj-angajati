import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
import { Schedule } from './Schedule';
import { FolderPagesProvider } from './useScheduleContext';

import './styles.css';

function App() {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
  });

  return (
    <FolderPagesProvider>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Schedule />
        <button className='print-btn' onClick={handlePrint}>
          Print
        </button>
      </div>
      <ComponentToPrint ref={componentRef} />
    </FolderPagesProvider>
  );
}

export default App;
