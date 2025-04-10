document.addEventListener('DOMContentLoaded', function() {
  // Load data from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      populateRoster(data.roster);
      populateMerchandise(data.merchandise);
      populateResults(data.results);
      populateNextMatch(data.nextMatch);
      populateYouTubeHighlights(data.youtubeHighlights);
      populateComments(data.comments);
    })
    .catch(error => console.error('Error loading data:', error));

  // Add smooth scrolling to navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  function populateRoster(roster) {
    const rosterSection = document.getElementById('roster');
    const rosterList = document.createElement('ul');
    roster.forEach(player => {
      const playerItem = document.createElement('li');
      playerItem.textContent = `${player.name} - ${player.position}`;
      rosterList.appendChild(playerItem);
    });
    rosterSection.appendChild(rosterList);
  }

  function populateMerchandise(merchandise) {
    const merchandiseSection = document.getElementById('merchandise');
    const merchandiseList = document.createElement('ul');
    merchandise.forEach(item => {
      const merchandiseItem = document.createElement('li');
      merchandiseItem.textContent = `${item.name} - $${item.price}`;
      merchandiseList.appendChild(merchandiseItem);
    });
    merchandiseSection.appendChild(merchandiseList);
  }

  function populateResults(results) {
    const resultsSection = document.getElementById('results');
    const resultsList = document.createElement('ul');
    results.forEach(result => {
      const resultItem = document.createElement('li');
      resultItem.textContent = `${result.date} - ${result.score} vs ${result.opponent}`;
      resultsList.appendChild(resultItem);
    });
    resultsSection.appendChild(resultsList);
  }

  function populateNextMatch(nextMatch) {
    const nextMatchSection = document.getElementById('next-match');
    const nextMatchText = document.createElement('p');
    nextMatchText.textContent = `${nextMatch.date} vs ${nextMatch.opponent}`;
    nextMatchSection.appendChild(nextMatchText);
  }

  function populateYouTubeHighlights(youtubeHighlights) {
    const highlightsSection = document.getElementById('highlights');
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = `https://www.youtube.com/embed?listType=user_uploads&list=${youtubeHighlights}`;
    iframe.frameborder = '0';
    iframe.allowfullscreen = true;
    highlightsSection.appendChild(iframe);
  }

  function populateComments(comments) {
    const commentsSection = document.getElementById('comments');
    const commentsList = document.createElement('ul');
    comments.forEach(comment => {
      const commentItem = document.createElement('li');
      commentItem.textContent = `${comment.author}: ${comment.text}`;
      commentsList.appendChild(commentItem);
    });
    commentsSection.appendChild(commentsList);
  }

  // Back to Top button functionality
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
