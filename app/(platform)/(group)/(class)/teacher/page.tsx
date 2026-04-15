import { User } from '@/src/User';
import Navbar from '../../_components/interactive/Navbar';
import Nameplate from '../../_components/ui/Nameplate';
import './tmp.css';
import Box from '../../_components/ui/Box';

//temp
const students: User[] = [
  {
    id: 2,
    name: {first:"John",last:"Doe"}
  },
  {
    id: 3,
    name: {first:"Jane",last:"Doe"}
  }
];

export default function Teacher() {
  return (
    <>
      <Navbar user={{id:1,name: {first:"Kiernan",last:"Sharief"}}} volunteer/>
      <div className="row" style={{justifyContent: 'space-between'}}>
        <div className="border-right">
          <div className="border-bottom">
            <p className="subtitle">Upcomming Session</p>
          </div>
          <div>
            <p className="subtitle">Chats</p>
            <div># Main</div>
            {students.map((student) => <div># {student.name.first}</div>)}
          </div>
        </div>
        <div>
        </div>
        <div className="border-left">
          <div className="border-bottom">
            <p className="subtitle">Teacher</p>
            <Nameplate user={{id:1,name: {first:"Kiernan",last:"Sharief"}}} />
          </div>
          <div>
            <p className="subtitle">Students</p>
            {students.map((student) => Nameplate({user: student}))}
          </div>
        </div>
      </div>
    </>
  )
}