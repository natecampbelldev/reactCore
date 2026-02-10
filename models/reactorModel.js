import mongoose from 'mongoose'

const partSchema = mongoose.Schema({
    part: {
      type: String,
      required: true,
      default: "part",
      immutable: true,
    },
    integrity: {
      type: Number,
      default: 100,
      required: true,
    },
    ideal: {
      type: Number,
      required: true,
      default: 0,
      immutable: true,
    },
    loss: {
      type: Number,
      required: true,
      default: 0,
      immutable: true,
    },
    max: {
      type: Number,
      required: true,
      default: 0,
      immutable: true,
    },
    installed: {
      type: Date,
      default: () => Date.now(),
      required: true,
      immutable: true,
    },
  });
  
  const reactorSchema = mongoose.Schema({
    name: {
      type: String,
      min: [4, "Must be at least 4 characters"],
      max: 16,
      required: true,
      unique: true,
      immutable: true,
    },
    locale: {
      type: String,
      enum: {
        values: ["USA", "Japan", "Europe"],
        message: "{VALUE} is not supported",
      },
      required: true,
      immutable: true,
    },
    created: {
      type: Date,
      default: () => Date.now(),
      required: true,
      immutable: true,
    },
    updated: {
      type: Date,
      default: () => Date.now(),
      required: true,
    },
    components: {
      type: [partSchema],
      default: [
        {
          part: "pressure",
          ideal: 15000,
          max: 15000 * 1.25,
          loss: 1,
        },
        {
          part: "pump-pressure",
          ideal: 400,
          max: 400 * 1.25,
          loss: 1,
        },
        {
          part: "pump-radiate",
          ideal: 400,
          max: 400 * 1.25,
          loss: 1,
        },
        {
          part: "steamer",
          ideal: 700,
          max: 700 * 1.25,
          loss: 1,
        },
        {
          part: "pump-steamer",
          ideal: 400,
          max: 400 * 1.25,
          loss: 1,
        },
        {
          part: "turbine",
          ideal: 700,
          max: 700 * 1.25,
          loss: 1,
        },
        {
          part: "generator",
          ideal: 120000,
          max: 120000 * 1.25,
          loss: 1,
        },
        {
          part: "condenser",
          ideal: 700,
          max: 700 * 1.25,
          loss: 1,
        },
        {
          part: "pump-vacuum",
          ideal: 400,
          max: 400 * 1.25,
          loss: 1,
        },
        {
          part: "supply",
          ideal: 700,
          max: 700 * 1.25,
          loss: 1,
        },
        {
          part: "pump-radSupply",
          ideal: 400,
          max: 400 * 1.25,
          loss: 1,
        },
        {
          part: "pump-waterSupply",
          ideal: 400,
          max: 400 * 1.25,
          loss: 1,
        },
      ],
      required: true,
    },
    inventory: [partSchema],
  });
  
const Reactor = mongoose.model('reactors', reactorSchema)

export default Reactor