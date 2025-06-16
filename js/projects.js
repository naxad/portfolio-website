// Projects.js — Dynamic Project Management Logic
$(document).ready(function () {
  let projects = JSON.parse(localStorage.getItem('projects')) || [];
  let isAdmin = false;

  // Prompt for admin key (for simplicity)
  const key = prompt("Enter admin key to manage projects:");
  if (key === "internetprogramming2025") {
    isAdmin = true;
  } else {
    $('#projectForm input, #projectForm select, #projectForm button').prop('disabled', true);
  }

  function renderProjects() {
    const statusFilter = $('#filterStatus').val();
    const sortBy = $('#sortOption').val();
    const tbody = $('#projectTable tbody');
    tbody.empty();

    let filtered = [...projects];
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    filtered.forEach((project, index) => {
      const row = $(
        `<tr class="priority-${project.priority.toLowerCase()}">
          <td>${project.name}</td>
          <td>${project.description}</td>
          <td>${project.dueDate}</td>
          <td>${project.status}</td>
          <td>${project.priority}</td>
          <td>
            ${isAdmin ? `
              <button class="btn btn-sm btn-success complete" data-index="${index}">✔</button>
              <button class="btn btn-sm btn-warning edit" data-index="${index}">✏️</button>
              <button class="btn btn-sm btn-danger delete" data-index="${index}">🗑️</button>
            ` : '🔒'}
          </td>
        </tr>`
      );
      tbody.append(row);
    });

    updateSummary();
  }

  function updateSummary() {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const pending = total - completed;
    $('#totalTasks').text(total);
    $('#pendingTasks').text(pending);
    $('#completedTasks').text(completed);
  }

  $('#projectForm').submit(function (e) {
    e.preventDefault();
    const newProject = {
      id: Date.now(), // unique ID
      name: $('#name').val(),
      description: $('#description').val(),
      dueDate: $('#dueDate').val(),
      priority: $('#priority').val(),
      status: 'pending'

    };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    this.reset();
    renderProjects();
  });

  $('#projectTable').on('click', '.complete', function () {
    const index = $(this).data('index');
    projects[index].status = 'completed';
    localStorage.setItem('projects', JSON.stringify(projects));
    renderProjects();
  });

  $('#projectTable').on('click', '.delete', function () {
    const index = $(this).data('index');
    if (confirm("Are you sure you want to delete this project?")) {
      projects.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(projects));
      renderProjects();
    }
  });

  $('#projectTable').on('click', '.edit', function () {
    const index = $(this).data('index');
    const project = projects[index];
    $('#name').val(project.name);
    $('#description').val(project.description);
    $('#dueDate').val(project.dueDate);
    $('#priority').val(project.priority);
    projects.splice(index, 1);
    renderProjects();
  });

  $('#filterStatus, #sortOption').on('change', renderProjects);

  renderProjects();
});
