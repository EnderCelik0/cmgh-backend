export interface Option {
  option_id: number;
  option_name: string;
  user_friendly_option_name: string;
  full_summary_name: string;
  thumbnail_size: string;
  available_default: boolean;
  has_quantity_control: boolean;
  option_img: string;
  disabled: boolean;
  option_group_id: number;
}

export interface OptionGroup {
  option_group_id: number;
  option_group_name: string;
  options: Option[];
}

export interface FeatureData {
  feature_id: number;
  feature_name: string;
  user_friendly_feature_name: string;
  unique_name: string;
  available_default: boolean;
  feature_description: string;
  disabled: boolean;
  feature_option_groups: OptionGroup[];
  no_group_options: Option[];
}

export interface Rule {
  event: {
    type: string;
    disable: string;
    disable_all: boolean;
  };
  conditions: {
    params: {
      selectedName: string;
      selectedColor: string;
      selectedNumber: number;
    };
  };
}

export type SelectedItem = {
  id: number;
  name: string;
  color: string;
  number: number;
};
