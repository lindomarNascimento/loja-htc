const renderMenuDesktop = (menu) => {
  console.log("menu :>> ", menu);
  let structureMenu = "";
  const $containerMenu = document.querySelector(".header__menu");

  menu.map((department) => {
    if (department.children === undefined) {
      structureMenu += `
        <div class="header__menu-wrapper">
          <a href=${department.url} class="header__menu-department">${department.name}</a>
        </div>
      `;
    } else {
      structureMenu += `
        <div class="header__menu-wrapper">
          <a href=${department.url} class="header__menu-department">${
        department.name
      }</a>
          <div class="header__menu--items">
            ${department.children.map((category) => {
              if (category.children === undefined) {
                return `<a href=${category.url} class="header__menu-category">${category.name}</a>`;
              } else {
                return `
                <div class="header__menu-wrapper-items">
                  <a href=${category.url} class="header__menu-category">${
                  category.name
                }</a>
                  <div class="header__menu--sub-item">
                    ${category.children.map((subcategory) => {
                      return `<a href=${category.url} class="header__menu-category">${category.name}</a>`;
                    })}
                  </div>
                </div>
                `;
              }
            })}
          </div>
        </div>
      `;
    }
  });

  $containerMenu.innerHTML = structureMenu;
};

const departmentFooterRender = (menu) => {
  let structureMenu = "";
  const $containerMenu = document.querySelector(".footer__links-list.menu");
  menu.map((department) => {
    structureMenu += ` <li class="footer__links-list--item">
      <a href="${department.url}" class="footer__links-link"> ${department.name}<a>
    </li>`;
  });

  console.log("structureMenu :>> ", $containerMenu);
  $containerMenu.innerHTML = structureMenu;
};

const requestMenuDesktop = () => {
  const menu = [];

  fetch("./src/script/menu/menu.json")
    .then((response) => response.json())
    .then((json) => {
      renderMenuDesktop(json.menu);
      departmentFooterRender(json.menu);
    });
};

const requestShelfs = () => {
  fetch("./src/script/shelf/shelf.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
};

const toggleFooter = () => {
  const $titles = document.querySelectorAll(`.footer__links-title`);

  $titles.forEach((title) => {
    title.addEventListener("click", () => {
      title.classList.toggle("show-item");
      title.parentElement.lastElementChild.classList.toggle("showMenu");
    });
  });
};
requestMenuDesktop();
requestShelfs();

toggleFooter();
