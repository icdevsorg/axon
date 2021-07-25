import React, { useEffect, useState } from "react";
import { Command } from "../../declarations/Axon/Axon.did";
import { ActionKey } from "../../lib/types";
import ManageNeuronForm from "./ManageNeuronForm";

const actions: [ActionKey, string][] = [
  ["ManageNeuron", "Manage Neuron"],
  ["ExecuteNnsFunction", "Execute Nns Function"],
  ["RewardNodeProvider", "Reward Node Provider"],
  ["SetDefaultFollowees", "Set Default Followees"],
  ["ManageNetworkEconomics", "Manage Network Economics"],
  ["ApproveGenesisKyc", "Approve Genesis Kyc"],
  ["AddOrRemoveNodeProvider", "Add Or Remove Node Provider"],
  ["Motion", "Motion"],
];

export default function MakeProposalForm({
  makeCommand,
}: {
  makeCommand: (cmd: Command | null) => void;
}) {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [actionKey, setActionKey] = useState<ActionKey>(actions[0][0]);
  const [action, setAction] = useState(null);

  useEffect(() => {
    if (action) {
      makeCommand({
        MakeProposal: {
          url,
          summary,
          action: [action],
        },
      });
    } else {
      makeCommand(null);
    }
  }, [actionKey, action]);

  const renderForm = () => {
    switch (actionKey) {
      case "ManageNeuron":
        return <ManageNeuronForm setAction={setAction} />;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <label>Action</label>
          <select
            className="w-full mt-1"
            onChange={(e) => setActionKey(e.target.value as ActionKey)}
            value={actionKey}
          >
            {actions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between">
            <span>URL</span>
            <span className="text-gray-400">Optional</span>
          </div>
          <input
            type="url"
            name="url"
            placeholder="URL"
            className="w-full mt-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            maxLength={2048}
          />
        </div>

        <div>
          <div className="flex justify-between">
            <span>Summary</span>
            <span className="text-gray-400">Optional</span>
          </div>
          <textarea
            placeholder="Summary"
            className="w-full mt-1"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            maxLength={280}
          />
        </div>
      </div>

      {renderForm()}
    </>
  );
}
