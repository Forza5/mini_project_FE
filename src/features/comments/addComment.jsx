const AddComment = () => {
    return (
        <>
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmitComment(comment);
        }}
        >
            
        </form>
        </>
    )
}

export default AddComment;