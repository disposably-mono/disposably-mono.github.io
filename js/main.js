const MATS_DATA = [HOME_DATA, PROJECTS_DATA, CONTACT_DATA];
const MAT_CREATORS = {
  home: createHomeMat,
  projects: createProjectsMat,
  contact: createContactMat,
};

document.addEventListener('DOMContentLoaded', () => {
  const desk = document.getElementById('desk');

  MATS_DATA.forEach((data) => {
    desk.appendChild(MAT_CREATORS[data.key]());
  });

  initNav(MATS_DATA);
  playEntranceAnimation('home');
});

window.addEventListener('resize', () => {
  document.querySelectorAll('.mat').forEach(buildCuttingMat);
  snapToCurrentMat();
});
