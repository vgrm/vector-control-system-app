import ProjectDataList from '../components/Project/ProjectDataList'
import ProjectDataUpload from '../components/Project/ProjectDataUpload'

const ProjectDataListPage = (props) => {

    return (
        <div>
            <ProjectDataUpload />
            <ProjectDataList />
        </div>
    );

}

export default ProjectDataListPage;