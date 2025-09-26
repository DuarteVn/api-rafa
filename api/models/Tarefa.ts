export interface Tarefa{
    id: number;
    descricao: string;
}

export default class TarefaModel{
    private static tarefas: Tarefa[] = [];

    static list(): Tarefa[]{
        return this.tarefas
    }

    static create(descricao: string): Tarefa{
        const nova: Tarefa = {id: this.tarefas.length + 1, descricao};
        this.tarefas.push(nova);
        return nova;
    }
}