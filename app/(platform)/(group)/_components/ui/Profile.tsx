import { User } from "@/src/User";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile(options: {user: User}) {
    return (
        <div>
            <FontAwesomeIcon icon={faCircleUser} />
        </div>
    )
}