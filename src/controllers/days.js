// исходная функция

const renderEventsByDays = (events) => { // Алгоритм отрисовки точек маршрута по дням:
  let daysIndex = 0; // (создали индекс для доступа к нужному дню в коллекции)

  let tripDaysItemComponent = new DayComponent(events[0], daysIndex + 1);
  render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 1. Создать контейнер первого дня и заполнить датойОтъезда первого элемента

  let tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);
  renderEvent(tripEventsListAll[daysIndex], events[0]);

  for (let i = 1; i < events.length; i++) {
    if (events[i].dateFrom.getDate() === events[i - 1].dateFrom.getDate()) { // 2. Проверить второй элемент "если ( элемнт два происходит в этот день)"
      renderEvent(tripEventsListAll[daysIndex], events[i]); // 2.1 отрисовать элемент в этот контейнер
    } else {
      daysIndex++; // (увеличиваем индекс на 1, т.к. начался следующий день)

      tripDaysItemComponent = new DayComponent(events[i], daysIndex + 1);
      render(tripDays, tripDaysItemComponent, RenderPosition.BEFOREEND); // 3. Создать контейнер второго дня и заполнить датойОтъезда второго элемента

      tripEventsListAll = tripDays.querySelectorAll(`.trip-events__list`);

      renderEvent(tripEventsListAll[daysIndex], events[i]); // 4. Отрисовать точку маршрута в этот контейнер
    }
  }
};

renderEventsByDays(points);

// задача написать функцию так, чтобы она отрисовывала дни согласно дате, а не по порядку
