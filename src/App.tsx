import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
import { HeaderDates } from './HeaderDates';

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
    <>
      <div style={{ display: 'flex', gap: '15px', overflow: 'auto' }}>
        <HeaderDates handlePrint={handlePrint} />
      </div>
      <ComponentToPrint ref={componentRef} />
    </>
  );
}

export default App;
