import React from 'react';

function GradeSelector({ grades, selectedGrade, onChangeGrade }) {
  return (
    <div className="grade-selector">
      <label htmlFor="gradeDropdown" className="grade-label">
      </label>
      <select
        id="gradeDropdown"
        value={selectedGrade}
        onChange={(e) => onChangeGrade(e.target.value)}
      >
        {grades.map((grade) => (
          <option key={grade} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GradeSelector;
