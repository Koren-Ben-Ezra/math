import React from 'react';
import '../Navbar.css';

function Navbar({ topics, selectedTopic, onSelectTopic }) {
  return (
    <nav className="navbar">
      <ul className="topics-list">
        {topics.map((topic) => {
          const isActive = selectedTopic?.file === topic.file ? 'active' : '';
          return (
            <li
              key={topic.file}
              className={isActive}
              onClick={() => onSelectTopic(topic)}
            >
              {topic.title}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
