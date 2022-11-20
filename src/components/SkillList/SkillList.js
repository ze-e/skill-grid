import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { DataContext } from "../../contexts/DataContext";
import { UserContext } from "../../contexts/UserContext";

import SkillListLevel from "./SkillListLevel";
export default function SkillList() {
  const { state } = useContext(DataContext);
  const { user } = useContext(UserContext);

  const levels = state.data.levels;

  const [teacherView, setTeacherView] = useState(false);

  return (
    <div className="skillList">
      {user.admin?.userType === "teacher" && (
          <button
            className="skillList__button"
            type="button"
            onClick={() => {
              setTeacherView(!teacherView);
            }}
          >
            {teacherView ? "Close Teacher View" : "Teacher View"}
            </button>
      )}
      <div className="skillList__levels">
        {levels.length > 0 &&
          levels.map((level, index) => {
            return (
              <SkillListLevel
                key={level.id}
                index={index}
                level={level}
                teacherView={teacherView}
              />
            );
        })}
      </div>
    </div>
  );
}

SkillList.propTypes = {
  teacherView: PropTypes.bool,
};
