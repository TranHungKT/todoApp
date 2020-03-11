export const login = async (username, password) => {
    const response = await fetch('http://192.168.1.6:5000/users/login', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username, password}),
    })
  
    if (response.ok) {
      return true
    }
  
    const errMessage = await response.text()
    throw new Error(errMessage)
  }


  export const register = async (username, password1,password2) => {
    const response = await fetch('http://192.168.1.6:5000/users/register', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username, password1,password2}),
    })
  
    if (response.ok) {
      return true
    }
  
    const errMessage = await response.text()
    throw new Error(errMessage)
  }