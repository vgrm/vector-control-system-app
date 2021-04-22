import ProjectSetList from '../components/Project/ProjectSetList';
import ProjectSetForm from '../components/Project/ProjectSetForm';
import ProjectSet from '../components/Project/ProjectSet';

const ProjectSetPage = ({ classes, ...props }) => {
    return (
    <div>
        PROJECT SET
        <ProjectSet {...props}/>
    </div>
    );

}

export default ProjectSetPage;