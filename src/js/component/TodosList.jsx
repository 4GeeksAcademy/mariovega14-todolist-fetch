import React, { useEffect, useState } from "react";
const initialTask = {
	label: "",
	is_done: false
}

const urlBase = "https://playground.4geeks.com/todo"
const TodosList = () => {
	const [task, setTask] = useState(initialTask)
	const [taskList, setTaskList] = useState([])


	const handleChange = ({ target }) => {
		setTask({
			...task,
			label: target.value
		})
	}


	const getAllTask = async () => {
		try {

			const response = await fetch(`${urlBase}/users/mario`)
			const data = await response.json()

			console.log(data, "data")
			console.log(response, "Response")

			if (response.ok) {
				setTaskList(data.todos)
			} else {
				createNewUser()
			}

		} catch (error) {
			console.log(error)
		}
	}

	//funcion para crear usuario

	const createNewUser = async () => {
		try {
			const response = await fetch(`${urlBase}/users/mario`, {
				method: "POST"
			})
		} catch (error) {

		}
	}

	const addTask = async (event) => {
		if (event.key == "Enter") {
			try {
				const response = await fetch(`${urlBase}/todos/mario`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(task)
				})
				if (response.ok) {
					getAllTask()
				}
				console.log(response)
			} catch (error) {
				console.log(error)
			}
		}

	}

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`${urlBase}/todos/${id}`, {
				method: "DELETE"
			})
			if (response.ok) {
				getAllTask()
			}
		} catch (error) {
			console.log(error)
		}
	}



	useEffect(() => {
		getAllTask()
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-7">
					<h1>Lista de tareas</h1>
					<form onSubmit={(event => event.preventDefault())}>
						<input type="text"
							className="form-control"
							placeholder="Agrega la tarea"
							name="label"
							value={task.label}
							onChange={handleChange}
							onKeyDown={addTask}
						/>
					</form>
					{
						taskList.map((item) => (
							<div key={item.id} className="task">
								{item.label}
								<span>
									<button onClick={() => deleteTask(item.id)}>X</button>
								</span>
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default TodosList