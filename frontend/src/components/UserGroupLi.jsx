export default function UserGroupLi({ group, role, key }) {

    return (
        <li key={key}>
            <strong>{group}</strong>: {role}
        </li>
    )
};