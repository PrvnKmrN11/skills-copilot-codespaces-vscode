function skillsMember() {
  // Remove any existing skills
  var skills = document.querySelectorAll('.skills')
  for (var i = 0; i < skills.length; i++) {
    skills[i].remove();
  }

  // Add new skills
  var member = document.querySelector('.member');
  var skills = document.createElement('div');
  skills.classList.add('skills');
  member.appendChild(skills);

  var skillsList = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'SQL',
    'Python',
    'Ruby',
    'Ruby on Rails',
    'Git',
    'GitHub',
    'Heroku',
    'Netlify',
    'Vercel',
    'AWS',
    'DigitalOcean',
    'Google Cloud Platform'
  ];

  for (var i = 0; i < skillsList.length; i++) {
    var skill = document.createElement('div');
    skill.classList.add('skill');
    skill.textContent = skillsList[i];
    skills.appendChild(skill);
  }
}