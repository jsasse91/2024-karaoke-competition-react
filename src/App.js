import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';

function App() {
  const url = 'https://65a30b08a54d8e805ed35e8b.mockapi.io/karaokeContestants';
  const [ contestants, setContestants ] = useState([{}]);
  const [ newContestantName, setNewContestantName ] = useState('');
  const [ newSongTitle, setNewSongTitle ] = useState('');
  const [ updatedContestantName, setupdatedContestantName ] = useState('');
  const [ updatedSongTitle, setupdatedSongTitle ] = useState('');


  async function getAll() {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      // console.log(data);
      setContestants(data);
    } catch(e) {
      console.log(`Issues fetching from ${url}`, e);
    }
  }

  useEffect ( () => {
    getAll();
    console.log(contestants)
  }, [])

  async function deleteContestant(id) {
    try {
          const resp = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }catch(e) {
          console.log(`Issues deleting from ${url}`, e);
        }
        getAll();
  }

  async function updateContestant(e, contestantObject) {
      e.preventDefault();
      let updatedContestantObject = {
        ...contestantObject,
        contestantName: updatedContestantName,
        songTitle: updatedSongTitle,
      }

    try {
      const resp = await fetch(`${url}/${contestantObject.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedContestantObject)
      })
    }catch(e) {
      console.log(`Issues updating id of ${contestantObject.id}`);
    }
    getAll();
  }

  async function postNewContestant(e) {
      e.preventDefault();
      const resp = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          contestantName: newContestantName,
          songTitle: newSongTitle,
        })
      })
      getAll();
      
  }

  return (
    <>
      <NavBar />
      <div className='m-2 border'>
        <div className='container m-2'>
          <form>
            <h4 className='text-center'>Sign Up Form</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" placeholder='Enter Name' className="form-control" id="name" onChange={(e) => setNewContestantName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="song" className="form-label">Song Title</label>
              <input type="text" placeholder='Enter Song' className="form-control" id="song" onChange={(e) => setNewSongTitle(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-dark" onClick={(e) => postNewContestant(e)}>Submit</button>
          </form>
        </div>
      </div>
      { contestants.map((contestant, index) => (
        <div key={index} className='card m-2'>
          <div className='card-header text-center'>
            <p className='card-text'>Contestant Number: {index + 1}</p>
            <p className='card-text'>Contestant Name: {contestant.contestantName}</p>
            <p className='card-text'>Contestant Song: {contestant.songTitle}</p>
            <p><button className='btn btn-danger' onClick={() => deleteContestant(contestant.id)}>Delete Contestant</button></p>
          </div>
          <div className='card-body'>
              <form>
                <h6 className='text-center'>Update this contestant</h6>
                <div className='mb-2'>
                  <label htmlFor='updateName' className='form-label'>Update Name</label>
                  <input type='text' id='updateName' className='form-control' placeholder='Enter Updated Name' onChange={(e) => setupdatedContestantName(e.target.value)}></input>
                </div>
                <div className='mb-2'>
                  <label htmlFor='updateSong' className='form-label'>Update Song Title</label>
                  <input type='text' id='updateSong' className='form-control' placeholder='Enter Updated Song' onChange={(e) => setupdatedSongTitle(e.target.value)}></input>
                </div>
                <div>
                  <button type='submit' className='btn btn-dark' onClick={(e) => updateContestant(e, contestant)}>Update</button>
                </div>
              </form>
            </div>
          </div>
      ))}
    </>
  );
}

export default App;
