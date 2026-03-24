import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function Tokenomics() {
  const data = [
    { name: "Public Sale", value: 95, color: "#ec4899" },
    { name: "Development", value: 5, color: "#f9a8d4" },
  ];

  const stats = [
    { label: "Total Supply", value: "1,000,000,000", suffix: "NANA" },
    { label: "Public Allocation", value: "95%", suffix: "" },
    { label: "Dev Allocation", value: "5%", suffix: "" },
    { label: "Blockchain", value: "Solana", suffix: "" },
  ];

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-pink-50/50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">Tokenomics</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fair distribution designed for long-term community growth and sustainability.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-pink-300/30 rounded-3xl blur-2xl" />
            <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-pink-200/50 shadow-xl">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-8 mt-6">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-700 font-semibold">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-pink-300/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-pink-200/50 shadow-lg h-full">
                  <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-pink-600">
                    {stat.value}
                  </p>
                  {stat.suffix && (
                    <p className="text-gray-500 text-sm mt-1">{stat.suffix}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
