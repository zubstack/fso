const Notification = ({ notification }) => {

  if (notification === null) {
    return null
  }
  
  const colors = {
    'success': 'green',
    'error': 'red'
  }

  const style = {
    color: colors[notification.type],
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
