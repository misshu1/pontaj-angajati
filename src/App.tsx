import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
import { HeaderDates } from './HeaderDates';
import { FolderPagesProvider } from './useScheduleContext';

import './styles.css';

function App() {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
  });

  useEffect(() => {
    const printEvent = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        handlePrint();
      }
    };

    window.addEventListener('keydown', (e) => printEvent(e));

    return () => {
      window.removeEventListener('keydown', printEvent);
    };
  }, []);

  return (
    <FolderPagesProvider>
      <div style={{ display: 'flex', gap: '15px' }}>
        <HeaderDates />
        <button className='print-btn' onClick={handlePrint}>
          Print
        </button>
      </div>
      <ComponentToPrint ref={componentRef} />
    </FolderPagesProvider>
  );
}

export default App;
