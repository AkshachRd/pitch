export type TagColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

export type Tag = {
    id: string;
    name: string;
    color: TagColor;
};
