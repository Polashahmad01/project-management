import { useState } from "react"

import ProjectsSidebar from "./components/ProjectsSidebar"
import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import SelectedProject from "./components/SelectedProject"

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random()
      const newTask = {
        text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id)
      }
    })
  }

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData) {
    const projectId = Math.random()
    const newProjet = {
      ...projectData,
      id: projectId
    }

    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProjet]
      }
    })
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks} />;

  if(projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>
  } else if(projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar projects={projectsState.projects} onStartAddProject={handleStartAddProject} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  )
}

export default App
