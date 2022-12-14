import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "./dto/create-task.dto";
import { getTaskFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";


@EntityRepository(Task)
export class TaskRepository extends Repository <Task> {

    async getTasks(filterDto : getTaskFilterDto , user : User) : Promise<Task[]> {
        const { status , search } = filterDto ;
        const query = this.createQueryBuilder('task'); 
        query.where('task.userId = :userId',{userId : user.id});
        if(status)
        {
            query.andWhere('task.status = :status',{status});
        }
        if(search)
        {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)',{search :`%${search}%`})
        }
        const tasks = await query.getMany();
        return tasks ;
    }

    async createTask(createTaskDto : createTaskDto , user : User) : Promise<Task> {
        const  {title , description} = createTaskDto ;
        const task = new Task();
        task.title = title ;
        task.description = description ;
        task.status = TaskStatus.OPEN;
        task.user = user ;
        await task.save();
        delete task.user ;
        return task;
    }
}