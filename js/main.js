// Keep bookmarks to sections on the original single-page portfolio working.
const sectionPages = {
  about: 'about.html',
  education: 'about.html',
  skills: 'about.html',
  interests: 'about.html',
  experience: 'experience.html',
  projects: 'projects.html',
};
const section = window.location.hash.slice(1);
const page = sectionPages[section];
if (page && window.location.pathname.endsWith('/' + page) === false) {
  window.location.replace(page + window.location.hash);
}
