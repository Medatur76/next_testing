import { User } from "@/src/User";

export default function Nameplate(options: {user: User}) {
    return (
        <div className="nameplate">
            {options.user.name.first + " " + options.user.name.last}
        </div>
    )
}