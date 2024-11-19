function addTodoForm () {
    return (
      <>
        <form>
          <label htmlFor="todoTitle">Title</label>
          <input type="text" id="todoTitle"></input>
          <submit>Add</submit>
        </form>
      </>
    );
}

export default addTodoForm;