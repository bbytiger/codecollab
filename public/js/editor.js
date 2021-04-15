const save_doc = async function() {
  j = document.getElementById('editor').innerHTML

  dat = {
    username: 'andy',
    content: j
  }

  fetch('/save_doc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dat)
  }).then((res) => {
    if (res.json() == "success") {
      // flash success banner
      
    }
    else  {
      // flash unsuccessful banner

    }
  }).catch(
    (err) => {
      console.log(err)
      throw err;
    }
  )
}

const clear_doc = function() {
  document.getElementById('editor').innerHTML = ""
}