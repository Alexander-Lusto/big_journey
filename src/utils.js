export const createElement = (template) => {
  const newElement = document.createElement(`div`); // создаём пустой див
  newElement.innerHTML = template; // добавляем в него шаблонную строку

  return newElement.firstChild; // возвращаем дом-элемет
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
}

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newChildElement = newComponent.getElement();
  const oldChildElement = oldComponent.getElement();

  const isEsistElements = !!(parentElement && newChildElement && oldChildElement);
  if (isEsistElements && parentElement.contains(oldChildElement)) {
    parentElement.replaceChild(newChildElement, oldChildElement);
  }
};
