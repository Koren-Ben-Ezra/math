import React, { useState, useEffect } from 'react';
import GradeSelector from './components/GradeSelector';
import Navbar from './components/Navbar';
import TopicViewer from './components/TopicViewer';
import './styles.css'; // Ensure we import the updated styles

function App() {
  const [gradesInfo, setGradesInfo] = useState({});
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [topics, setTopics] = useState([]); // e.g., [{ file, title }, { file, title }]
  const [selectedTopic, setSelectedTopic] = useState({ file: '', title: '' });

  // Mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // On mount, fetch grades.json
  useEffect(() => {
    fetch('/content/grades.json')
      .then((res) => res.json())
      .then((data) => {
        setGradesInfo(data);
        const gradeKeys = Object.keys(data);
        setGrades(gradeKeys);

        // Select the first grade by default
        if (gradeKeys.length > 0) {
          setSelectedGrade(gradeKeys[0]);
        }
      })
      .catch((err) => console.error('Error fetching grades.json:', err));
  }, []);

  // Update topics whenever the selectedGrade changes
  useEffect(() => {
    if (selectedGrade && gradesInfo[selectedGrade]) {
      const newTopics = gradesInfo[selectedGrade];
      setTopics(newTopics);
      setSelectedTopic(newTopics.length > 0 ? newTopics[0] : { file: '', title: '' });
    }
  }, [selectedGrade, gradesInfo]);

  const handleGradeChange = (newGrade) => {
    setSelectedGrade(newGrade);
    setIsMenuOpen(false);
  };

  const handleTopicSelect = (topicObj) => {
    setSelectedTopic(topicObj);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="app-container">
      {/* Header with Title + Grade Selector */}
      <header className="header">
        
        <GradeSelector
          grades={grades}
          selectedGrade={selectedGrade}
          onChangeGrade={handleGradeChange}
        />
        
        <h1 className="site-title">נושאים במתמטיקה</h1>

        {/* Hamburger button (visible on mobile only) */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </header>

      {/* Mobile menu (appears when hamburger is clicked on small screens) */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : 'closed'}`}>
        <Navbar
          topics={topics}
          selectedTopic={selectedTopic}
          onSelectTopic={handleTopicSelect}
        />
      </div>

      {/* Main content viewer */}
      <TopicViewer
        grade={selectedGrade}
        topicFile={selectedTopic.file}
      />

      {/* Footer */}
      <footer class="site-footer">
      <div class="footer-content">
        <a 
          href="https://www.linkedin.com/in/koren-ben-ezra" 
          target="_blank" 
          rel="noopener noreferrer"
          class="linkedin-link"
          title="Connect with Koren Ben Ezra on LinkedIn"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" 
            alt="LinkedIn Logo" 
            class="linkedin-icon"
          />
          <span class="linkedin-text"> Koren Ben Ezra</span>
        </a>
      </div>
    </footer>





    </div>
  );
}

export default App;
