import { useScheduleContext } from './useScheduleContext';

export const Schedule = () => {
  const { employee, updateEnployee, updateMonth, updateYear } =
    useScheduleContext();

  const yearsList = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <input
        type='text'
        value={employee}
        onChange={(e) => updateEnployee(e.target.value)}
        placeholder='Nume Angajat'
      />

      <select name='month' onChange={(e) => updateMonth(+e.target.value)}>
        <option value='1'>Ianuarie</option>
        <option value='2'>Februarie</option>
        <option value='3'>Martie</option>
        <option value='4'>Aprilie</option>
        <option value='5'>Mai</option>
        <option value='6'>Iunie</option>
        <option value='7'>Iulie</option>
        <option value='8'>August</option>
        <option value='9'>Septembrie</option>
        <option value='10'>Octombrie</option>
        <option value='11'>Noiembrie</option>
        <option value='12'>Decembrie</option>
      </select>

      <select name='year' onChange={(e) => updateYear(+e.target.value)}>
        {yearsList.map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
