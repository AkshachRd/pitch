export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
    public: {
        Tables: {
            card: {
                Row: {
                    back_side: string;
                    created_at: string;
                    front_side: string;
                    id: number;
                };
                Insert: {
                    back_side: string;
                    created_at?: string;
                    front_side: string;
                    id?: number;
                };
                Update: {
                    back_side?: string;
                    created_at?: string;
                    front_side?: string;
                    id?: number;
                };
                Relationships: [];
            };
            card_has_tag: {
                Row: {
                    created_at: string;
                    id_card: number;
                    id_tag: number;
                };
                Insert: {
                    created_at?: string;
                    id_card?: number;
                    id_tag: number;
                };
                Update: {
                    created_at?: string;
                    id_card?: number;
                    id_tag?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'card_has_tag_id_card_fkey';
                        columns: ['id_card'];
                        isOneToOne: false;
                        referencedRelation: 'card';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'card_has_tag_id_tag_fkey';
                        columns: ['id_tag'];
                        isOneToOne: false;
                        referencedRelation: 'tag';
                        referencedColumns: ['id'];
                    },
                ];
            };
            repetition: {
                Row: {
                    created_at: string;
                    difficulty: number;
                    due: string;
                    elapsed_days: number;
                    id: number;
                    id_card: number | null;
                    lapses: number;
                    last_review: string | null;
                    reps: number;
                    scheduled_days: number;
                    stability: number;
                    state: Database['public']['Enums']['card_state'];
                };
                Insert: {
                    created_at?: string;
                    difficulty: number;
                    due: string;
                    elapsed_days: number;
                    id?: number;
                    id_card?: number | null;
                    lapses: number;
                    last_review?: string | null;
                    reps: number;
                    scheduled_days: number;
                    stability: number;
                    state?: Database['public']['Enums']['card_state'];
                };
                Update: {
                    created_at?: string;
                    difficulty?: number;
                    due?: string;
                    elapsed_days?: number;
                    id?: number;
                    id_card?: number | null;
                    lapses?: number;
                    last_review?: string | null;
                    reps?: number;
                    scheduled_days?: number;
                    stability?: number;
                    state?: Database['public']['Enums']['card_state'];
                };
                Relationships: [
                    {
                        foreignKeyName: 'repetition_id_card_fkey';
                        columns: ['id_card'];
                        isOneToOne: false;
                        referencedRelation: 'card';
                        referencedColumns: ['id'];
                    },
                ];
            };
            tag: {
                Row: {
                    color: string | null;
                    created_at: string;
                    id: number;
                    name: string | null;
                };
                Insert: {
                    color?: string | null;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                };
                Update: {
                    color?: string | null;
                    created_at?: string;
                    id?: number;
                    name?: string | null;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            card_state: 'New' | 'Learning' | 'Review' | 'Relearning';
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
      ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
      ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
      ? PublicSchema['Enums'][PublicEnumNameOrOptions]
      : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof PublicSchema['CompositeTypes']
        | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database;
    }
        ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
        : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
      ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
      : never;
