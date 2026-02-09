Promise.all([
  fetch('./data/classes_rows.json').then(r=>r.json()),
  fetch('./data/lesson_schedule_rows.json').then(r=>r.json()),
  fetch('./data/teachers_rows.json').then(r=>r.json()),
  fetch('./data/lessons_rows.json').then(r=>r.json())
]).then(([classes, schedules, teachers, lessons]) => {

  const tById = Object.fromEntries(teachers.map(t=>[t.id,t]));
  const lById = Object.fromEntries(lessons.map(l=>[l.id,l]));
  const tbody = document.getElementById('tbody');

  classes.forEach(c => {
    schedules
      .filter(s => s.class_id === c.id)
      .forEach(s => {
        tbody.innerHTML += `
          <tr class="border-t">
            <td class="p-3">${c.name}</td>
            <td class="p-3">${lById[s.lessons_id]?.subject}</td>
            <td class="p-3">${tById[s.teacher_id]?.name}</td>
          </tr>`;
      });
  });
});
